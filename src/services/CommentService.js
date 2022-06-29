import { BaseService } from "./BaseService";

export class CommentService extends BaseService {

    constructor() {
        super()
    }

    getAllComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`)
    }

    insertComment = (comment) => {
        return this.post(`Comment/insertComment`,comment)
    }

    deleteComment = (idComment) => {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }

    editComment = (idComment,contentComment) => {
        return this.put(`Comment/updateComment?id=${idComment}&contentComment=${contentComment}`)
    }
}

export const commentService = new CommentService()