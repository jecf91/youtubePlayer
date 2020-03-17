import React , { useState , useEffect } from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar , VideoList , VideoDetail } from './Components';
import youtube from './API/youtube';

const App = () => {

    const [videos , setVideos] = useState([]);
    const [selectedVideo , setSelectedVideo ] = useState(null);

    useEffect(() => {
        const firstRequest = async (firstTheme) => {
            const {data : {items: videos } } = await youtube.get("search", {
                params:{
                    part: "snippet",
                    maxResults: 5,
                    key: process.env.REACT_APP_API_KEY,
                    q: firstTheme
                }
            });

            setVideos(videos)
            setSelectedVideo(videos[0]);
        }

        firstRequest('ReactJS')
    } , [])
    
    const handleSubmit = async (searchTerm) => {
        const {data : {items: videos } } = await youtube.get("search", {
            params:{
                part: "snippet",
                maxResults: 5,
                key: process.env.REACT_APP_API_KEY,
                q: searchTerm
            }
        });
        
        setVideos(videos);  
        setSelectedVideo(videos[0]);
    }

    return(
        <Grid style={{  justifyContent: "center"  }} container spacing={10}>
            <Grid item xs={11}>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <SearchBar onSubmit={handleSubmit}/>
                    </Grid>
                    <Grid item xs={8}>
                        <VideoDetail video={selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default App;