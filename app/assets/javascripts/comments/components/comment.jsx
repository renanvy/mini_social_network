class Comment extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      editing: false
    }
  }

  handleDelete (e) {
    e.preventDefault();

    this.props.onCommentDelete(this.props.id);
  }

  linkToRemove () {
    if (this.props.user_id !== this.props.currentUserId) { return; }

    return (
      <a
        onClick={this.handleDelete.bind(this)}
        style={{
          cursor: "pointer",
          marginLeft: 5,
          color: "#c44a4a"
        }}>
        ✖
      </a>
    );
  }

  handleUpdate (e) {
    e.preventDefault();

    let text = this.refs.text.value.trim();

    if (!text) {
      $(this.refs.text).notify("Não pode ficar em branco.", "error");
      return;
    } else {
      this.setState({ editing: false });

      this.props.onCommentUpdate(this.props.id, text);
    }
  }

  handleCancel (e) {
    e.preventDefault();

    this.setState({
      editing: false
    });
  }

  handleEditElement (e) {
    e.preventDefault();

    this.setState({ editing: true });
  }

  renderComment () {
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
          <div className="btn-group" style={{marginTop: -15}}>
            <a
              onClick={this.handleEditElement.bind(this)}
              className="btn btn-default btn-xs">Editar
            </a>

            <a
              onClick={this.handleDelete.bind(this)}
              className="btn btn-danger btn-xs">Remover
            </a>
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
        style={{marginTop: 10, marginBottom: 20, background: "#f5f5f5", padding: 10}}
        id={`comment_${this.props.id}`}>
        <p style={{fontSize: 14}}>
          <a href={`/users/${this.props.user_id}`}>
            {this.props.user_full_name}
          </a>

          <span style={{fontSize: 11, marginLeft: 5}}>
            {moment(this.props.created_at).format('DD/MM/YYYY HH:mm')}
          </span>
        </p>

        {this.renderComment()}
      </div>
    );
  }
}
