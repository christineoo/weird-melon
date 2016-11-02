import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts'
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import { Link } from 'react-router'
import Card from '../Card';
import shortid from 'shortid';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPosts()).then((res) => {
          console.log('post - componentDidMount - res: ', res)
        }).catch((e) => {
          console.log('catch error: ', e)
        }) ;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.posts !== nextProps.posts) {
            this.setState({
                posts: nextProps.posts
            });
        }
    }

    renderPost = () => {

        const { dispatch } = this.props;

        let postEntries = [];
        let codeBlock = Object.assign({}, {
                            CodeBlock: CodeBlock
                        });
        let user = JSON.parse(LocalStorageUtils.get('user'));

        if (this.state.posts.items){
            this.state.posts.items.map((post) => {
                postEntries.push(<Card key={shortid.generate()} user={user} post={post} />);
            });
        }
        return postEntries;
    };

    render() {
        console.log('this.props.posts: ', this.props.posts);
        return(
            <div style={{margin: '80px auto 0 auto', width: '800px'}}>
                <ul style={{listStyle: 'none'}}>
                    {this.renderPost()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
  const { posts } = state;

  return {
    posts
  };
}

export default connect(mapStateToProps)(Post);
