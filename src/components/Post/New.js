import React, { Component, PropTypes } from 'react';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import ReactMarkdown from 'react-markdown';
import Editor from './Editor';
import CodeBlock from './CodeBlock';
import { createPost } from '../../actions/posts'
import { navigateTo } from '../../actions/navigator';

import { connect } from 'react-redux';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            postTimestamp: '',
            code:  ''
        }
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleSubmit = () => {
        let title = this.title.value;
        let user = JSON.parse(LocalStorageUtils.get('user'));

        let newPost = Object.assign({}, {
            user_id: user.uid,
            title: title,
            body: this.state.code,
            postTimestamp: Date.now()
        });
        // let body = this.state.code;
        if (title && this.state.code) {
            const { dispatch } = this.props;
            dispatch(createPost(newPost)).then((res) => {
                let newRoute = { path: ['posts'] };
                dispatch(navigateTo(newRoute));
              console.log('create new: ', res)
            }).catch((e) => {
              console.log('create new error: ', e)
            });
        }
        else {
            console.log("title and body cannot be empty")
        }
    };

    setRef(ref, item){
        if(item == 'title') {
            this.title = ref;
        }
        else if(item == 'body'){
            this.body = ref;
        }
        else if(item == 'markdownbody'){
            this.markdownbody = ref;
        }
    }

    onMarkdownChange = (md) => {
        this.setState({
            code: md
        });
    };

    render() {
        let codeBlock = Object.assign({}, {
                            CodeBlock: CodeBlock
                        });

        return (
            <div style={{padding: '20px'}}>
                <div style={{marginTop: '30px'}}>
                    <h1 style={{display: 'inline'}}>New post page</h1>
                    <button onClick={this.handleSubmit} style={{float: 'right'}}>create new post</button>
                </div>
                <div>
                    <input type="text" placeholder="title" ref={(ref) => this.setRef(ref, 'title')} />
                </div>
                <div>
                    <Editor value = {this.state.code} onChange = {this.onMarkdownChange} />
                    <ReactMarkdown
                        className="markdown-preview"
                        source={this.state.code}
                        renderers={codeBlock}
                        skipHtml = {this.state.htmlMode === 'skip'}
                        escapeHtml = {this.state.htmlMode === 'escape'}
                    />
                </div>
            </div>
        )
    }
}

NewPost.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default NewPost;
export default connect()(NewPost);
