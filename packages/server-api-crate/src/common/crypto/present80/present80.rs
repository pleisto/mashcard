use hex::FromHex;
use napi::bindgen_prelude::*;
use napi_derive::napi;
use std::io::Read;
/**
 * Part of the code from the https://github.com/yi-jiayu/PRESENT.rs/blob/master/src/present80.rs
 * Copyright (c) 2018 Jiayu Yi | MIT Licensed
 */

// 10 bytes equivalent to 80 bits
pub const KEY_LENGTH_IN_BYTES: usize = 10;
type RoundKeys = [u64; super::NUM_ROUNDS + 1];

#[derive(Clone, Copy)]
pub struct Key {
  bytes: [u8; KEY_LENGTH_IN_BYTES],
}

#[derive(Clone, Copy)]
struct KeyRegister {
  a: u64,
  b: u64,
}

impl Key {
  pub fn new(bytes: &[u8]) -> Key {
    let mut b = [0u8; KEY_LENGTH_IN_BYTES];
    bytes
      .take(KEY_LENGTH_IN_BYTES as u64)
      .read_exact(&mut b)
      .unwrap();

    Key { bytes: b }
  }
}

impl KeyRegister {
  fn rotate(&mut self) {
    let w = self.a & 0b1111111111111111111111111111111111111111111110000000000000000000;
    let x = self.a & 0b0000000000000000000000000000000000000000000001111111111111111000;
    let y = self.a & 0b0000000000000000000000000000000000000000000000000000000000000111;
    let z = self.b & 0b1111111111111111000000000000000000000000000000000000000000000000;

    let a = (y << 61) + (z >> 3) + (w >> 19);
    let b = x << 45;

    self.a = a;
    self.b = b;
  }

  fn update2(&mut self) {
    let w = (self.a >> 60) & 0xf;
    let x = super::S[w as usize];
    let y = (x as u64) << 60;
    let z = self.a & 0x0fffffffffffffff;

    let a = y + z;
    let b = self.b;

    self.a = a;
    self.b = b;
  }

  fn update3(&mut self, round_counter: u64) {
    let w = (self.a & 0xf) << 1;
    let x = (self.b >> 63) & 1;
    let y = w + x;
    let z = y ^ round_counter;

    let p = (z & 0b11110) >> 1;
    let q = (z & 0b00001) << 63;
    let r = self.a & 0xfffffffffffffff0;
    let s = self.b & 0x7fffffffffffffff;

    let a = p + r;
    let b = q + s;

    self.a = a;
    self.b = b;
  }

  fn update(&mut self, round_counter: usize) {
    self.rotate();
    self.update2();
    self.update3(round_counter as u64);
  }
}

fn generate_round_keys(key: Key) -> [u64; super::NUM_ROUNDS + 1] {
  let mut round_keys = [0u64; super::NUM_ROUNDS + 1];
  let mut key_register = KeyRegister::from(key);
  for i in 0..super::NUM_ROUNDS {
    round_keys[i] = key_register.a;
    key_register.update(i + 1);
  }

  round_keys[super::NUM_ROUNDS] = key_register.a;
  round_keys
}

impl From<Key> for KeyRegister {
  fn from(key: Key) -> Self {
    let (mut a, mut b) = (0u64, 0u64);
    for (i, x) in key.bytes.iter().enumerate() {
      let byte = *x as u64;
      if i < 8 {
        let shift = 56 - i * 8;
        a |= byte << shift;
      } else {
        let shift = 120 - i * 8;
        b |= byte << shift;
      }
    }

    KeyRegister { a, b }
  }
}

fn decrypt(state: u64, round_keys: &RoundKeys) -> u64 {
  let mut state = state;
  state = super::add_round_key(state, round_keys[super::NUM_ROUNDS]);

  for i in (0..super::NUM_ROUNDS).rev() {
    state = super::inv_p_layer(state);
    state = super::inv_s_box_layer(state);
    state = super::add_round_key(state, round_keys[i]);
  }

  state
}

fn encrypt(state: u64, round_keys: &RoundKeys) -> u64 {
  let mut state = state;

  for i in 0..super::NUM_ROUNDS {
    state = super::add_round_key(state, round_keys[i]);
    state = super::s_box_layer(state);
    state = super::p_layer(state);
  }

  state = super::add_round_key(state, round_keys[super::NUM_ROUNDS]);
  state
}

/**
 * Converts a hex string keys to a round keys.
 */
fn string2key(str: String) -> Result<[u64; super::NUM_ROUNDS + 1]> {
  <[u8; 32]>::from_hex(str)
    .map_err(|e| Error::new(Status::InvalidArg, format!("Invalid key: {}", e)))
    .map(|key| {
      generate_round_keys(Key::new(&[
        // KEY_LENGTH_IN_BYTES == 10
        // random pick bytes from 32 bytes key
        key[0], key[31], key[1], key[24], key[16], key[17], key[2], key[30], key[18], key[10],
      ]))
    })
}

/// Encrypt plain integer with key
/// That is safer alternative to hashids
/// @param {Number} data
/// @param {String} key
/// @return {String} base58 encoded ciphertext
#[napi]
pub fn int_encrypt(data: i64, key_str: String) -> Result<String> {
  string2key(key_str).map(|round_keys| {
    let blocks: Vec<[u8; 8]> = data
      .to_be_bytes()
      .chunks(super::BLOCK_SIZE_IN_BYTES)
      .map(super::bytes_to_state)
      .map(|state| encrypt(state, &round_keys))
      .map(super::state_to_bytes)
      .collect();

    let num_blocks = blocks.len() * super::BLOCK_SIZE_IN_BYTES;
    let mut encrypted: Vec<u8> = Vec::with_capacity(num_blocks);
    for block in blocks.iter() {
      encrypted.extend(block.iter());
    }

    bs58::encode(&encrypted).into_string()
  })
}

/// Decrypt plain integer with key
/// That is safer alternative to hashids
/// @param {Number} base58 encoded ciphertext
/// @param {String} key
/// @return {String} original integer
#[napi]
pub fn int_decrypt(data_str: String, key_str: String) -> Result<i64> {
  let round_keys = string2key(key_str)?;
  bs58::decode(data_str)
    .into_vec()
    .map_err(|e| Error::new(Status::InvalidArg, format!("Invalid ciphertext: {e}")))
    .map(|data| {
      let blocks: Vec<[u8; 8]> = data
        .chunks(super::BLOCK_SIZE_IN_BYTES)
        .map(super::bytes_to_state)
        .map(|state| decrypt(state, &round_keys))
        .map(super::state_to_bytes)
        .collect();
      let num_blocks = blocks.len() * super::BLOCK_SIZE_IN_BYTES;
      let mut decrypted: Vec<u8> = Vec::with_capacity(num_blocks);
      for block in blocks.iter() {
        decrypted.extend(block.iter());
      }

      i64::from_be_bytes(decrypted.try_into().unwrap_or_default())
    })
}
