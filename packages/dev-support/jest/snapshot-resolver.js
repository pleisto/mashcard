module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    `${testPath}${snapshotExtension}`.replace(/src/, '__snapshots__'),

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace(snapshotExtension, '').replace('__snapshots__', 'src'),

  testPathForConsistencyCheck: 'src/components/some.test.tsx'
}
