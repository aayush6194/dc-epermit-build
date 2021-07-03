export const getKeys = (points: any[]) => {
    if(points?.length < 1) return [];
    return Object.keys(points[0]).filter(k => k !== 'date')
}
