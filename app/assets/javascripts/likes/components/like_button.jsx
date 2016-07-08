class LikeButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      likesCount: this.props.likesCount,
      buttonText: this.props.postLiked ? "Descurtir" : "Curtir",
      postLiked: this.props.postLiked
    }
  }

  handleLikePost () {
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "/likes",
      data: { like: { post_id: this.props.postId, user_id: this.props.currentUserId } },
      success: (data, textStatus, jqXHR) => {
        this.setState({
          likesCount: this.state.likesCount += 1,
          buttonText: "Descurtir",
          postLiked: true
        });
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro curtir o post", "error");
      }
    });
  }

  handleUnlikePost () {
    $.ajax({
      method: "DELETE",
      url: `/likes/${this.props.postId}`,
      success: (data, textStatus, jqXHR) => {
        this.setState({
          likesCount: this.state.likesCount -= 1,
          buttonText: "Curtir",
          postLiked: false
        });
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro descurtir o post", "error");
      }
    });
  }

  render () {
    return (
      <div style={{marginTop: 10}}>
      <a
        onClick={this.state.postLiked ? this.handleUnlikePost.bind(this) : this.handleLikePost.bind(this)}
        className="link-social like"
        style={{cursor: "pointer"}}>

        {`${this.state.buttonText} (${this.state.likesCount})`}
      </a>
      </div>
    );
  }
}
