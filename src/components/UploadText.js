import React from 'react'
import RenderImages from "./renderImages"
import { Form, TextArea, Icon, Header, Button, Input, Radio, Message, Divider, List, Modal} from 'semantic-ui-react'
import { getImagesByKeyWord, getKeyWords, getImagesByKeyWordShutter } from "../queries"

import MessageExampleIcon from './loadingMessage'

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
        showKeywords: false,
        loading: false,
        url: "",
        urlTemp: "",
        urlPressed: false,
        openModal: false
    }

    handleClose = () => this.setState({ openModal: false })

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

        this.setState({loading: true})

        if (this.state.url.length < 1) {
            this.setState({openModal: true})
        }

        getKeyWords(this.state.text, this.state.url).then((keyWordsFromServer) => {

            console.log(keyWordsFromServer)
            console.log("Array.isArray(keyWordsFromServer):" + Array.isArray(keyWordsFromServer))

            if(keyWordsFromServer && Array.isArray(keyWordsFromServer)) {
                this.setState({searchDone: true})

                let Keywords = keyWordsFromServer[0]
                let KeywordsJoined = keyWordsFromServer[1]

                if (keyWordsFromServer.length > 0) {
                    this.setState({Keywords: Keywords, KeywordsJoined: KeywordsJoined, noKeywords: false, serverErr: false, showKeywords: true, loading: false})
                } else {
                    this.setState({noKeywords: true, showKeywords: false, loading: false})
                }
                
            } else {
                this.setState({serverErr: true, showKeywords: false, loading: false})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({serverErr: true, showKeywords: false, loading: false})
        })
    }

    urlPressed(e) {
        e.preventDefault()
        this.setState({url: this.state.urlTemp})
        this.setState({urlPressed: true})
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

                <br />
                <br />

                <div style={{textAlign: 'center'}}>
                    <Form onSubmit={(e) => this.urlPressed(e)}>
                            <Input  
                                type="text"
                                placeholder='https://5ad83887.ngrok.io'
                                value={this.state.urlTemp}
                                onChange={ e => {this.setState({ urlTemp: e.target.value })}}
                                />
                            <Button type='submit'> Update server url </Button>
                    </Form>    
                </div>

                <br />
                <br />

                {this.state.urlPressed && 
                    <div style={{textAlign: 'center'}}>
                        <Message info compact>
                            <Message.Header>{"Server URL ------>  " + (this.state.url.length > 1 ? this.state.url : "CHOOSE URL!")}</Message.Header>
                        </Message>
                    </div>
                }

                <br />
                <br />

                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='searchengin' />
                            Keywords from text 
                    </Header>
                </Divider>
                

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

                { this.state.loading && 
                    <div style={{textAlign: 'center'}}>
                        <MessageExampleIcon />
                    </div>
                }

                { this.state.showKeywords && 
                    <div style={{textAlign: 'center'}}>
                            <Message success compact>
                                <Message.Header> Keywords found!</Message.Header>
                            </Message>
                        <br/>
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
                            Image Search from ShutterStock & UnSplash APIs
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

                <Modal open={this.state.openModal} basic size='small' onClose={this.handleClose}>
                    <Header icon='cancel' content='Server URL not updated, you wish to continue?' />
                    <Modal.Content>
                    <p>
                        This app is working with ngrok free version, hence you have to update the ngrok tunnel every 8 hrs of use
                    </p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button basic color='red' inverted onClick={this.handleClose}>
                        <Icon name='remove' /> OK
                    </Button>
                    </Modal.Actions>
                </Modal>
                
            </div>
        )
    }
}

export default UploadText