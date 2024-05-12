import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

//CRIADO COM SKELETON PARA CARREGAR O VIDEO

function Media(props) {
  const { loading = false, title, description } = props;

return (
    <Card sx={{ maxWidth: 345, m: 2 ,width:345}}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
            (!title || !title.trim()) ? (
              loading ? (
                <Skeleton
                  animation="wave"
                  height={10}
                  width="400px"
                  style={{ marginBottom: 6 }}
                />
              ) : (
                title
              )
            ) : (
              title
            )
          }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            ''
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
        />
      )}

            <CardContent>
            {(!description || !description.trim()) ? (
                loading ? (
                <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
                ) : null // Se não houver descrição, não mostra nada (opcional)
            ) : (
                <Typography variant="body2" color="text.secondary" component="p">
                {description}
                </Typography>
            )}
            </CardContent>

    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function LoadingVideo(props) {
  const { title, description } = props;

  return (
    <div>
        
      <Media title={title} description={description} loading />
    </div>
  );
}
