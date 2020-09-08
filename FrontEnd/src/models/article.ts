import Comments from "./comment"

export default interface Atricles{
    _id: String,
    author: String,
    title: String,
    abstract: String,
    body: String,
    imageUrl: String,
    comments: Comments[],
    createdAt: String,
    updatedAt: String,
    __v: number
}