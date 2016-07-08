class CommentList extends React.Component {

  render () {
    let comments = this.props.comments.map((comment, index) => {
      return (
        <Comment
          key={index}
          currentUserId={this.props.currentUserId}
          onCommentDelete={this.props.onCommentDelete.bind(this)}
          onCommentUpdate={this.props.onCommentUpdate.bind(this)}
          {...comment} />
      );
    });

    return (
      <div>
        {comments}
      </div>
    );
  }
}
