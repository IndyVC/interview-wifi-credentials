export interface IVisitor {
    firstname: string,
    lastname: string,
    email: string,
    companyId: number
}

export function getVisitors(filter: {
    firstname?: string,
    lastname?: string,
    email?: string
}) {

    // TODO : Create that will search through the visitors database (../../data/visitors) and returns an array of visitors matching the criteria
}