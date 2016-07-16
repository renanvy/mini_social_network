class Post extends React.Component {

  constructor (props) {
    super(props);

    this.state = { editing: false }
  }

  handleDelete (e) {
    e.preventDefault();

    this.props.onPostDelete(this.props.id);
  }

  handleUpdate (e) {
    e.preventDefault();

    let text = this.refs.text.value.trim();

    if (!text) {
      $(this.refs.text).notify("Não pode ficar em branco.", "error");
      return;
    } else {
      this.setState({ editing: false });

      this.props.onPostUpdate(this.props.id, text);
    }
  }

  handleCancel (e) {
    e.preventDefault();

    this.setState({ editing: false });
  }

  handleEditElement (e) {
    e.preventDefault();

    this.setState({ editing: true });
  }

  renderPost () {
    if (this.props.user_id !== this.props.currentUserId) {
      return this.props.text;
    }

    if (this.state.editing) {
      return (
        <form onSubmit={this.handleUpdate.bind(this)}>
          <div className="row">
            <div className="col-md-12">
              <textarea
                ref="text"
                id="post_text"
                className="form-control"
                defaultValue={this.props.text}>
              </textarea>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-4">
              <div className="btn-group">
                <input
                  type="submit"
                  value="Atualizar"
                  className="btn btn-success btn-xs"
                />

                <a
                  onClick={this.handleCancel.bind(this)}
                  className="btn btn-default btn-xs">
                  Cancelar
                </a>
              </div>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <div>
          <div className="btn-group">
            <button
              type="button"
              onClick={this.handleEditElement.bind(this)}
              className="btn btn-default btn-xs">Editar
            </button>

            <button
              type="button"
              onClick={this.handleDelete.bind(this)}
              className="btn btn-danger btn-xs">Remover
            </button>
          </div>

          <br /><br />

          {this.props.text}
        </div>
      );
    }
  }

  render () {
    return (
      <div
        id={`post_${this.props.id}`}
        className="jumbotron"
        style={{background: "#fcfcea"}}>
        <h4>
          <a href={`/users/${this.props.user_id}`}>
            {this.props.user_full_name}
          </a>

          <span style={{fontSize: 11, marginLeft: 5}}>
            {moment(this.props.created_at).format('DD/MM/YYYY HH:mm')}
          </span>
        </h4>

        {this.renderPost()}

        <LikeButton
          postId={this.props.id}
          currentUserId={this.props.currentUserId}
          likesCount={this.props.likes_count}
          postLiked={this.props.post_liked}
        />

        <CommentBox
          postId={this.props.id}
          userFullName={this.props.user_full_name}
          currentUserId={this.props.user_id}
          comments={this.props.comments}
        />
      </div>
    );
  }
}
