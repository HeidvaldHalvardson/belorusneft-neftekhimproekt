import { useNavigate, useParams } from 'react-router-dom';

import { getVideoById } from '@/entities/VideoList';
import { Card } from '@/shared/ui/Card';

const VideoPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { data: video, error, isLoading } = getVideoById(params.id);

    if (!isLoading && !video) {
        navigate('/not_found');
    }

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>Что-то пошло не так...</div>}
            {video && <Card item={video} />}
        </>
    );
};

export default VideoPage;
