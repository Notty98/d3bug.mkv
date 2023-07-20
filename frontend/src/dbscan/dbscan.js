import { DBSCAN } from 'density-clustering'

export const getClusters = (data, epsilon, minPoints) => {
  const dbscan = new DBSCAN()
  const clusters = dbscan.run(data, epsilon, minPoints)
  return clusters

}