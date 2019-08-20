import React from 'react'
import RenderImages from "./renderImages"
import { Form, TextArea, Icon, Header, Button, Input, Radio, Message, Divider, List } from 'semantic-ui-react'
import { getImagesByKeyWord, getKeyWords, getImagesByKeyWordShutter } from "../queries"


class UploadText extends React.Component {
    state = {
        term: '',
        images: [], 
        text: '',
        Keywords: [],
        KeywordsJoined: [],
        api: "Using UnSplash",
        pressed: false,
        searchDone: false,
        noKeywords: false,
        serverErr: false,
        showKeywords: false
    }

    onFormSubmitKeyWords(e){
        e.preventDefault()

        // use Unsplash API 
        if (this.state.api === "Using UnSplash") {
            getImagesByKeyWord(this.state.term).then((images) => {
                this.setState({images: images.data.results})
            })    
        }
        // use ShutterStock API  
        else {
            getImagesByKeyWordShutter(this.state.term).then((images) => {
                this.setState({images: images.data.data})
            }) 
        }
    }

    switchApi() {
        console.log(this.state.api)
        if (this.state.api === "Using UnSplash") {
            this.setState({api: "Using Shutterstock"})
        } else {
            this.setState({api: "Using UnSplash"})
        } 
    }

    onFormSubmitText(e) {
        e.preventDefault()
        getKeyWords()

        getKeyWords(this.state.text).then((keyWordsFromServer) => {

            if(keyWordsFromServer) {
                this.setState({searchDone: true})

                let Keywords = keyWordsFromServer[0]
                let KeywordsJoined = keyWordsFromServer[1]

                if (keyWordsFromServer.length > 0) {
                    this.setState({Keywords: Keywords, KeywordsJoined: KeywordsJoined, noKeywords: false, serverErr: false, showKeywords: true})
                } else {
                    this.setState({noKeywords: true, showKeywords: false})
                }
            } 
        }).catch((err) => {
            this.setState({serverErr: true, showKeywords: false})
        })
    }

    render() {

        let keywordList = this.state.Keywords.map((keyword) => { 

            return (
                <div style={{textAlign: 'center'}}>
                    <div key={keyword[0]}>
                        <List>
                            <List.Item>{keyword[0]}</List.Item>
                        </List>
                    </div>
                </div>
            )
        })

        let keywordListJoined = this.state.KeywordsJoined.map((keyword) => { 

            return (
                <div style={{textAlign: 'center'}}>
                    <div key={keyword[0]}>
                        <List>
                            <List.Item>{keyword[0]}</List.Item>
                        </List>
                    </div>
                </div>
            )
        })

        return (
            
            <div>

                <Header as='h3' block color='grey' textAlign='center'>
                    NLP Project 
                    <Icon name='bolt' size='massive' color='yellow'/>
                </Header>
                

                <Form onSubmit={(e) => this.onFormSubmitText(e)}>
                    <TextArea 
                        type = "text"
                        placeholder='Enter a text you wish the NLP algorithm will provide key terms for' 
                        style={{ minHeight: 300, textAlign: 'center' }}
                        value={this.state.text}
                        onChange={ e => {this.setState({ text: e.target.value })}}
                    />
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <br/>
                        <Button type='submit'>Compute key words </Button> 
                    </div>
                </Form>

                <br/>

                { this.state.noKeywords && 
                    <div style={{textAlign: 'center'}}>
                        <Message warning>
                            <Message.Header>No keywords found!</Message.Header>
                        </Message>
                    </div>
                }

                { this.state.serverErr && 
                    <div style={{textAlign: 'center'}}>
                        <Message negative>
                            <Message.Header>Server error!</Message.Header>
                        </Message>
                    </div>
                }

                { this.state.showKeywords && keywordList

                }

                <br/>

                { this.state.showKeywords && keywordListJoined

                }

                <br/>
                <br/>

                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='images' />
                        Image Search - Use computed key terms from text / Your key terms 
                    </Header>
                </Divider>

                <br/>

                <div style={{textAlign: 'center'}}>     

                    <Message compact size='small'>
                        <Message.List>
                            <Message.Item>To use image just click the right mouse button and copy it.</Message.Item>
                            <Message.Item>To switch between APIs, just click the toggle button.</Message.Item>
                        </Message.List>
                    </Message>

                    <br/>

                    <Form.Field>
                        <Radio toggle label={this.state.api} onChange={() => {this.switchApi()}} />
                    </Form.Field>   

                    <br/>
                    <br/>
    
                    <Form onSubmit={(e) => this.onFormSubmitKeyWords(e)}>
                        <Input 
                            type="text"
                            icon={<Icon name='search' inverted circular/>}
                            placeholder='Search terms'
                            size='huge'
                            value={this.state.term}
                            onChange={ e => {this.setState({ term: e.target.value })}}
                            />
                        <br/>
                        <Button type='submit' onClick={()=>{this.setState({pressed:true})}}> Click to search for images </Button>
                    </Form>    
                
                    <br/>

                    { (this.state.images.length > 0) &&
                        <RenderImages images={this.state.images} />
                    }

                    { (this.state.images.length === 0) && (this.state.pressed) &&
                        <Message warning>
                            <Message.Header>No images found, Try again</Message.Header>
                        </Message>                    
                    }

                </div>
                
            </div>
        )
    }
}

export default UploadText