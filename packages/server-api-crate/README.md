# Brickdoc API Server Rust Crate

crate has some utilities written in Rust and based on [napi-rs](https://github.com/napi-rs/napi-rs) to make them could be used in NodeJS Server.

## How to use it

Just `import { something } from '@brickdoc/server-api-crate'` in your code.

## How to chose whether to implement a utility in Rust or NodeJS?

> The following is an excerpt translated from Broooooklyn's article "[用 Rust 和 N-API 开发高性能 Node.js 扩展](https://lyn.one/2020/09/11/rust-napi)".

NodeJS's native addons are faster than NodeJS in CPU-bound tasks, but there is a lot of overhead once you make frequent calls between N-API and the V8 engine in NodeJS.

For example, a property's value on a JS object in NodeJS is several times faster than in Rust. And because JavaScript Array type is backed with Object, the performance of manipulating Arrays would be the same as Objects. The conversion between Array and `Vec<T>` is even heavier in O(2n) complexity. When you write a native addon, always remember to consider whether the performance optimizations from the native code will be offset by the overhead of the N-API calls within it.

The good news is that the overhead of the FFI calls is negligible most of the time compared to RPC calls.
Take a simple function `genSlug()` as a case: Although its JS version has a performance of 1000k ops/s and Rust FFI version has only 823k ops/s (17.67% slower than the JS version) because the return value is `Vec<String>`, But 823k ops/s is actually more than enough for real-world needs.
