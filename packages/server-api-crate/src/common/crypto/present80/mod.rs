pub mod present80;

/**
 * Part of the code from the https://github.com/yi-jiayu/PRESENT.rs/blob/master/src/lib.rs
 * Copyright (c) 2018 Jiayu Yi | MIT Licensed
 */

pub const BLOCK_SIZE_IN_BYTES: usize = 8;
pub(crate) const NUM_ROUNDS: usize = 31;
pub(crate) const S: [u8; 16] = [0xC, 5, 6, 0xB, 9, 0, 0xA, 0xD, 3, 0xE, 0xF, 8, 4, 7, 1, 2];
pub(crate) const S_INV: [u8; 16] = [5, 0xE, 0xF, 8, 0xC, 1, 2, 0xD, 0xB, 4, 6, 3, 0, 7, 9, 0xA];
pub(crate) const P: [u8; 64] = [
  0, 16, 32, 48, 1, 17, 33, 49, 2, 18, 34, 50, 3, 19, 35, 51, 4, 20, 36, 52, 5, 21, 37, 53, 6, 22,
  38, 54, 7, 23, 39, 55, 8, 24, 40, 56, 9, 25, 41, 57, 10, 26, 42, 58, 11, 27, 43, 59, 12, 28, 44,
  60, 13, 29, 45, 61, 14, 30, 46, 62, 15, 31, 47, 63,
];
pub(crate) const P_INV: [u8; 64] = [
  0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 1, 5, 9, 13, 17, 21, 25, 29, 33, 37,
  41, 45, 49, 53, 57, 61, 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 3, 7, 11,
  15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63,
];

pub(crate) fn s_box_layer(state: u64) -> u64 {
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

pub(crate) fn inv_s_box_layer(state: u64) -> u64 {
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

pub(crate) fn p_layer(state: u64) -> u64 {
  let mut new_state = 0u64;

  for (i, pi) in P.iter().enumerate() {
    let mask = 1 << i;
    let x = (state & mask) >> i;
    let y = x << *pi;
    new_state |= y;
  }

  new_state
}

pub(crate) fn inv_p_layer(state: u64) -> u64 {
  let mut new_state = 0u64;

  for (i, pi) in P_INV.iter().enumerate() {
    let mask = 1 << i;
    let x = (state & mask) >> i;
    let y = x << *pi;
    new_state |= y;
  }

  new_state
}

pub(crate) fn add_round_key(state: u64, round_key: u64) -> u64 {
  state ^ round_key
}

pub(crate) fn bytes_to_state(bytes: &[u8]) -> u64 {
  let mut state = 0u64;
  for (i, byte) in bytes.iter().take(BLOCK_SIZE_IN_BYTES).enumerate() {
    let x = (*byte as u64) << (7 - i) * 8;
    state |= x as u64;
  }
  state
}

pub(crate) fn state_to_bytes(state: u64) -> [u8; BLOCK_SIZE_IN_BYTES] {
  let mut bytes = [0u8; BLOCK_SIZE_IN_BYTES];
  for i in 0..BLOCK_SIZE_IN_BYTES {
    let x = (state >> (7 - i) * 8) & 0xff;
    bytes[i] = x as u8;
  }
  bytes
}
