class CommentForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();

    let text = this.refs.text.value.trim();

    if (!text) {
      $(this.refs.text).notify("Não pode ficar em branco", "error");
      return;
    }

    this.props.onCommentSubmit(text);

    this.refs.text.value = "";
  }

  render () {
    return (
      <div style={{marginTop: 20}}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="col-md-12">
              <textarea ref="text" className="form-control" rows="3"></textarea>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-2">
              <input type="submit" value="Comentar" className="btn btn-success btn-xs" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
