# Brickdoc API Server Rust Crate

crate has some utilities written in Rust and based on [napi-rs](https://github.com/napi-rs/napi-rs) to make them could be used in NodeJS Server.

## How to chose whether to implement a utility in Rust or NodeJS?

> The following is an excerpt translated from Broooooklyn's article "[用 Rust 和 N-API 开发高性能 Node.js 扩展](https://lyn.one/2020/09/11/rust-napi)".

NodeJS's native addons is fastest than NodeJS in CPU-bound tasks, but once you make frequent calls between N-API and
the V8 engine in NodeJS there is a lot of overhead.

For example, sets the value of a property on a JS object in NodeJS is several times faster than in Rust. **When you write a native addon, always remember to consider whether the performance optimizations from the native code will be offset by the overhead of the N-API calls within it.**
