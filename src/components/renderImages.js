import React from 'react'
import { Divider, Image, Grid } from 'semantic-ui-react'


class RenderImages extends React.Component {

    render() {

        let imagesList = this.props.images.map((image) => {

            if (image.hasOwnProperty("assets")) {

                return (
                    <div key={image.id}>
                        <Image src={image.assets.preview_1000.url} size='large' rounded centered/>
                        <Divider hidden />
                    </div>
                    )
                    
            } else {
                return (
                    <div key={image.id}>
                            <Image src={image.urls.regular} size='large' rounded centered/>
                            <Divider hidden />
                    </div>
                    )
            }
        
        })

        return (
        <div>
            <Grid columns={3}>   
                <Grid.Column>
                        {imagesList.slice(0,3)} 
                </Grid.Column>
                <Grid.Column>
                        {imagesList.slice(3,6)} 
                </Grid.Column>
                <Grid.Column>
                        {imagesList.slice(6,9)} 
                </Grid.Column>
            </Grid>    
        </div>

        )

    }
}

export default RenderImages