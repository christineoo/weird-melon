import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { fetchPosts } from '../../actions/posts';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import Card from '../Card';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts()).then((res) => {
      console.log('post - componentDidMount - res: ', res);
    }).catch((e) => {
      console.log('catch error: ', e);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        posts: nextProps.posts
      });
    }
  }

  renderPost = () => {
    const postEntries = [];
    const user = JSON.parse(LocalStorageUtils.get('user'));

    if (this.state.posts.items) {
      this.state.posts.items.map((post) => {
        postEntries.push(<Card key={shortid.generate()} user={user} post={post} />);
      });
    }
    return postEntries;
  };

  render() {
    console.log('this.props.posts: ', this.props.posts);
    return (
        <div style={{ margin: '80px auto 0 auto', width: '800px' }}>
            <ul style={{ listStyle: 'none' }}>
                {this.renderPost()}
            </ul>
        </div>
        );
  }
}

function mapStateToProps(state) {
  const { posts } = state;

  return {
    posts
  };
}

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

Post.propTypes = propTypes;


export default connect(mapStateToProps)(Post);
