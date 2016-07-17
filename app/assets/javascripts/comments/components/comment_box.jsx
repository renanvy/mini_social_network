class CommentBox extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      comments: this.props.comments,
      opened: false
    }
  }

  loadCommentsFromPost () {
    $.ajax({
      method: "get",
      dataType: "json",
      url: `/posts/${this.props.postId}/comments`,
      success: (data, textStatus, jqXHR) => {
        this.setState({ comments: data });
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro ao carregar os comentários do post", "error");
      }
    });
  }

  handleCommentSubmit(text) {
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "/comments",
      data: {
        comment: {
          text: text,
          post_id: this.props.postId,
          user_id: this.props.currentUserId
        }
      },
      success: (data, textStatus, jqXHR) => {
        this.loadCommentsFromPost();
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro ao enviar o comentário", "error");
      }
    });
  }

  handleCommentDelete (commentId) {
    $.ajax({
      method: "DELETE",
      url: `/comments/${commentId}`,
      success: (data, textStatus, jqXHR) => {
        this.loadCommentsFromPost();
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro ao remover o comentário", "error");
      }
    });
  }

  handleCommentUpdate (commentId, text) {
    $.ajax({
      method: "PUT",
      dataType: "json",
      url: `/comments/${commentId}`,
      data: {
        comment: { text: text }
      },
      success: (data, textStatus, jqXHR) => {
        this.loadCommentsFromPost();
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro ao atualizar o comentário", "error");
      }
    });
  }

  renderCommentBox () {
    if (!this.state.opened) { return; }

    return (
      <div>
        <CommentList
          currentUserId={this.props.currentUserId}
          comments={this.state.comments}
          onCommentDelete={this.handleCommentDelete.bind(this)}
          onCommentUpdate={this.handleCommentUpdate.bind(this)}
        />

        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    );
  }

  handleOpenCommentBox () {
    this.setState({ opened: !this.state.opened })
  }

  render () {
    return (
      <div style={{marginTop: 20, background: "#feffcb", padding: 20, border: "1px solid #d8dd80"}}>
        <button
          type="button"
          className="button-link"
          onClick={this.handleOpenCommentBox.bind(this)}
          style={{cursor: "pointer"}}>
          Comentários ({this.state.comments.length})
        </button>

        {this.renderCommentBox()}
      </div>
    );
  }
}
