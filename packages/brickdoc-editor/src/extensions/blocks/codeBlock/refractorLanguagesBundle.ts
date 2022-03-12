import { refractor } from 'refractor/lib/core'
import markdown from 'refractor/lang/markdown'
import css from 'refractor/lang/css'
import javascript from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import bash from 'refractor/lang/bash'
import json from 'refractor/lang/json'
import yaml from 'refractor/lang/yaml'
import sql from 'refractor/lang/sql'
import cpp from 'refractor/lang/cpp'
import csharp from 'refractor/lang/csharp'
import java from 'refractor/lang/java'
import python from 'refractor/lang/python'
import ruby from 'refractor/lang/ruby'
import objectivec from 'refractor/lang/objectivec'
import docker from 'refractor/lang/docker'
import elixir from 'refractor/lang/elixir'
import rust from 'refractor/lang/rust'
import lisp from 'refractor/lang/lisp'
import haskell from 'refractor/lang/haskell'
import php from 'refractor/lang/php'
import go from 'refractor/lang/go'
import kotlin from 'refractor/lang/kotlin'
import graphql from 'refractor/lang/graphql'
import powershell from 'refractor/lang/powershell'
import groovy from 'refractor/lang/groovy'
import solidity from 'refractor/lang/solidity'
import xml from 'refractor/lang/xml-doc'
import lua from 'refractor/lang/lua'
import scala from 'refractor/lang/scala'
import matlab from 'refractor/lang/matlab'
import applescript from 'refractor/lang/applescript'
import arduino from 'refractor/lang/arduino'
import basic from 'refractor/lang/basic'
import diff from 'refractor/lang/diff'
import r from 'refractor/lang/r'
import swift from 'refractor/lang/swift'
import toml from 'refractor/lang/toml'
import tcl from 'refractor/lang/tcl'
import wasm from 'refractor/lang/wasm'
import ebnf from 'refractor/lang/ebnf'
import latex from 'refractor/lang/latex'
import tsx from 'refractor/lang/tsx'
import jsx from 'refractor/lang/jsx'
import protobuf from 'refractor/lang/protobuf'
import ignore from 'refractor/lang/ignore'
import regex from 'refractor/lang/regex'
import ini from 'refractor/lang/ini'
import properties from 'refractor/lang/properties'

const langs = [
  typescript,
  python,
  java,
  cpp,
  sql,
  ruby,
  go,
  php,
  css,
  bash,
  json,
  yaml,
  r,
  rust,
  kotlin,
  csharp,
  swift,
  lua,
  graphql,
  xml,
  markdown,
  objectivec,
  javascript,

  // alphabet order
  applescript,
  arduino,
  basic,
  diff,
  docker,
  ebnf,
  elixir,
  groovy,
  haskell,
  ignore,
  ini,
  jsx,
  latex,
  lisp,
  matlab,
  powershell,
  properties,
  protobuf,
  regex,
  solidity,
  scala,
  tcl,
  tsx,
  toml,
  wasm
]

const languageNames = langs.map(lang => lang.displayName)

const registerLangs = (langs: any[]) => {
  langs.forEach(lang => {
    lang.aliases = []
    refractor.register(lang)
  })
}

registerLangs(langs)

export { refractor, languageNames }
