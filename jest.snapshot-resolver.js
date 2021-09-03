module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) => `${testPath}${snapshotExtension}`.replace(/dist/, '__snapshots__'),

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace(snapshotExtension, '').replace('__snapshots__', 'dist'),

  testPathForConsistencyCheck: 'dist/src/components/some.test.tsx'
}
