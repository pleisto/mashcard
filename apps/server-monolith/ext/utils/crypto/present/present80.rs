use hex::FromHex;
use magnus::{exception, Error};
use std::io::Read;

/**
 * Part of the code from the https://github.com/yi-jiayu/PRESENT.rs/blob/master/src/present80.rs
 * Copyright (c) 2018 Jiayu Yi | MIT Licensed
 */

// 10 bytes equivalent to 80 bits
const KEY_LENGTH_IN_BYTES: usize = 10;
type RoundKeys = [u64; NUM_ROUNDS + 1];

const BLOCK_SIZE_IN_BYTES: usize = 8;
const NUM_ROUNDS: usize = 31;
const S: [u8; 16] = [0xC, 5, 6, 0xB, 9, 0, 0xA, 0xD, 3, 0xE, 0xF, 8, 4, 7, 1, 2];
const S_INV: [u8; 16] = [5, 0xE, 0xF, 8, 0xC, 1, 2, 0xD, 0xB, 4, 6, 3, 0, 7, 9, 0xA];
const P: [u8; 64] = [
    0, 16, 32, 48, 1, 17, 33, 49, 2, 18, 34, 50, 3, 19, 35, 51, 4, 20, 36, 52, 5, 21, 37, 53, 6,
    22, 38, 54, 7, 23, 39, 55, 8, 24, 40, 56, 9, 25, 41, 57, 10, 26, 42, 58, 11, 27, 43, 59, 12,
    28, 44, 60, 13, 29, 45, 61, 14, 30, 46, 62, 15, 31, 47, 63,
];
const P_INV: [u8; 64] = [
    0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 1, 5, 9, 13, 17, 21, 25, 29, 33,
    37, 41, 45, 49, 53, 57, 61, 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 3, 7,
    11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63,
];

fn s_box_layer(state: u64) -> u64 {
    let mut new_state = 0u64;
    for i in 0..16 {
        let shift = i * 4;
        let mask = 0xf << shift;
        let x = (state & mask) >> shift;
        let y = S[x as usize] as u64;
        let z = y << shift;
        new_state |= z;
    }

    new_state
}

fn inv_s_box_layer(state: u64) -> u64 {
    let mut new_state = 0u64;
    for i in 0..16 {
        let shift = i * 4;
        let mask = 0xf << shift;
        let x = (state & mask) >> shift;
        let y = S_INV[x as usize] as u64;
        let z = y << shift;
        new_state |= z;
    }

    new_state
}

fn p_layer(state: u64) -> u64 {
    let mut new_state = 0u64;

    for (i, pi) in P.iter().enumerate() {
        let mask = 1 << i;
        let x = (state & mask) >> i;
        let y = x << *pi;
        new_state |= y;
    }

    new_state
}

fn inv_p_layer(state: u64) -> u64 {
    let mut new_state = 0u64;

    for (i, pi) in P_INV.iter().enumerate() {
        let mask = 1 << i;
        let x = (state & mask) >> i;
        let y = x << *pi;
        new_state |= y;
    }

    new_state
}

fn add_round_key(state: u64, round_key: u64) -> u64 {
    state ^ round_key
}

fn bytes_to_state(bytes: &[u8]) -> u64 {
    let mut state = 0u64;
    for (i, byte) in bytes.iter().take(BLOCK_SIZE_IN_BYTES).enumerate() {
        let x = (*byte as u64) << ((7 - i) * 8);
        state |= x as u64;
    }
    state
}

#[allow(clippy::needless_range_loop)]
fn state_to_bytes(state: u64) -> [u8; BLOCK_SIZE_IN_BYTES] {
    let mut bytes = [0u8; BLOCK_SIZE_IN_BYTES];
    for i in 0..BLOCK_SIZE_IN_BYTES {
        let x = (state >> ((7 - i) * 8)) & 0xff;
        bytes[i] = x as u8;
    }
    bytes
}

#[derive(Clone, Copy)]
struct Key {
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
        let x = S[w as usize];
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

#[allow(clippy::needless_range_loop)]
fn generate_round_keys(key: Key) -> [u64; NUM_ROUNDS + 1] {
    let mut round_keys = [0u64; NUM_ROUNDS + 1];
    let mut key_register = KeyRegister::from(key);
    for i in 0..NUM_ROUNDS {
        round_keys[i] = key_register.a;
        key_register.update(i + 1);
    }

    round_keys[NUM_ROUNDS] = key_register.a;
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
    state = add_round_key(state, round_keys[NUM_ROUNDS]);

    for i in (0..NUM_ROUNDS).rev() {
        state = inv_p_layer(state);
        state = inv_s_box_layer(state);
        state = add_round_key(state, round_keys[i]);
    }

    state
}

#[allow(clippy::needless_range_loop)]
fn encrypt(state: u64, round_keys: &RoundKeys) -> u64 {
    let mut state = state;

    for i in 0..NUM_ROUNDS {
        state = add_round_key(state, round_keys[i]);
        state = s_box_layer(state);
        state = p_layer(state);
    }

    state = add_round_key(state, round_keys[NUM_ROUNDS]);
    state
}

/**
 * Converts a hex string keys to a round keys.
 */
fn string2key(str: String) -> Result<[u64; NUM_ROUNDS + 1], Error> {
    <[u8; 32]>::from_hex(str)
        .map_err(|e| Error::new(exception::arg_error(), format!("Invalid key: {}", e)))
        .map(|key| {
            generate_round_keys(Key::new(&[
                // KEY_LENGTH_IN_BYTES == 10
                // random pick bytes from 32 bytes key
                key[0], key[31], key[1], key[24], key[16], key[17], key[2], key[30], key[18],
                key[10],
            ]))
        })
}

/// Encrypt plain integer with key
/// That is safer alternative to hashids
/// @param {Number} data
/// @param {String} key
/// @return {String} base58 encoded ciphertext
pub fn int_encrypt(data: i64, key_str: String) -> Result<String, Error> {
    string2key(key_str).map(|round_keys| {
        let blocks: Vec<[u8; 8]> = data
            .to_be_bytes()
            .chunks(BLOCK_SIZE_IN_BYTES)
            .map(bytes_to_state)
            .map(|state| encrypt(state, &round_keys))
            .map(state_to_bytes)
            .collect();

        let num_blocks = blocks.len() * BLOCK_SIZE_IN_BYTES;
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
pub fn int_decrypt(data_str: String, key_str: String) -> Result<i64, Error> {
    let round_keys = string2key(key_str)?;
    bs58::decode(data_str)
        .into_vec()
        .map_err(|e| Error::new(exception::arg_error(), format!("Invalid ciphertext: {e}")))
        .map(|data| {
            let blocks: Vec<[u8; 8]> = data
                .chunks(BLOCK_SIZE_IN_BYTES)
                .map(bytes_to_state)
                .map(|state| decrypt(state, &round_keys))
                .map(state_to_bytes)
                .collect();
            let num_blocks = blocks.len() * BLOCK_SIZE_IN_BYTES;
            let mut decrypted: Vec<u8> = Vec::with_capacity(num_blocks);
            for block in blocks.iter() {
                decrypted.extend(block.iter());
            }

            i64::from_be_bytes(decrypted.try_into().unwrap_or_default())
        })
}
