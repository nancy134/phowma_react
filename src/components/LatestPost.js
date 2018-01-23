import React, { Component } from 'react';
import TweetEmbed from 'react-tweet-embed';
import FacebookProvider, {EmbeddedPost} from 'react-facebook';

class LatestPost extends Component {
    constructor(props) {
        super(props);
        console.log("LatestPost:props: "+JSON.stringify(props));
        this.state = {
            type: props.type, 
            id: props.id, 
        };
    }

    componentWillReceiveProps(newProps){
        console.log("LatestPost:componentWillReceiveProps: newProps: "+JSON.stringify(newProps));
        this.setState({id: newProps.id, type: newProps.type});
    }
    render() {
        console.log("LatestPost:render:state.id: "+this.state.id);
        if (this.state.id === ""){
            return (<p>No items</p>);
        }else{ 
        if (this.state.type == "twitter"){
            return (
                <TweetEmbed id={this.state.id} />
            );
        } else {
            var str_array = this.state.id.split("_");
            var url = "https://www.facebook.com/" + str_array[0] + "/posts/" + str_array[1];
            return (
                <FacebookProvider appId='1075987872547151'>
                    <EmbeddedPost href={url} />
                </FacebookProvider>
            );
        }
        }
    }
};

export default LatestPost;

