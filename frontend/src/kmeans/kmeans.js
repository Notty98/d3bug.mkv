import { kmeans } from "ml-kmeans"

export const getClusters = (data, n) => {
    const results = new kmeans(data, n)
    return results
}

export const computeSSE = (originalData, results) => {
    let sse = 0
    for(let index = 0; index < originalData.length; index++) {
        const dataOriginalPoint = originalData[index]
        const centroid = results.centroids[results.clusters[index]]
        const currentDistance = distance(dataOriginalPoint, centroid)
        sse += Math.pow(currentDistance, 2);
    }

    return sse

}

export const distance = (point_1, point_2) => {
    const dx = point_1[0] - point_2[0]
    const dy = point_1[1] - point_2[1]
    return Math.sqrt(dx * dx + dy * dy)
}

