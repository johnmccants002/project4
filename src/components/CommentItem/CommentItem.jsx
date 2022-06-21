
export default function CommentItem({comment, user}) {
    return (<div>{comment.user.name}: {comment.commentText}</div>)
}