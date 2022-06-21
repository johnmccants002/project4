import CommentItem from '../CommentItem/CommentItem'
export default function CommentsList({comments, user}) {

    return (
        <>
        {comments.map((comment, index) => <CommentItem comment={comment} user={user}/>) }
        </>
    )
}