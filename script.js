// script.js
document.addEventListener('DOMContentLoaded', function () {
    const trackElements = document.querySelectorAll('.track'); // 获取所有的曲目容器
    let currentTrackIndex = 0; // 当前播放的曲目索引

    // 暂停其他音频
    function pauseAllOthers(currentAudio) {
        document.querySelectorAll('audio').forEach(audio => {
            if (audio !== currentAudio) {
                audio.pause();
                audio.currentTime = 0; // 重置时间为 0
            }
        });
    }

    // 随机播放一个曲目
    function playRandomTrack(trackElement) {
        const tracks = JSON.parse(trackElement.getAttribute('data-tracks')); // 获取曲目列表
        let randomIndex = Math.floor(Math.random() * tracks.length); // 随机选择一个曲目
        const selectedTrack = tracks[randomIndex];
        console.log('Selected Track:', selectedTrack); // 调试输出：被选中的曲目

        const audioElement = trackElement.querySelector('audio'); // 获取当前的 <audio> 元素
        audioElement.src = selectedTrack; // 设置音频源
        audioElement.load(); // 加载新的音频源

        // 监听 play 事件，当开始播放时暂停其他音频
        audioElement.addEventListener('play', function () {
            pauseAllOthers(audioElement);
        });

        // 当歌曲结束时，自动播放下一首
        audioElement.addEventListener('ended', function () {
            // 移除事件监听器，防止重复绑定
            audioElement.removeEventListener('ended', arguments.callee);
            
            // 自动转到下一个播放栏
            currentTrackIndex = (currentTrackIndex + 1) % trackElements.length; // 循环播放
            playRandomTrack(trackElements[currentTrackIndex]); // 播放下一个曲目
        });

        audioElement.play().catch(error => {
            console.log('自动播放被阻止:', error);
        }); // 播放音频，并捕获可能的错误
    }

    // 初次播放第一个 track 元素中的曲目
    playRandomTrack(trackElements[currentTrackIndex]);
});

document.addEventListener('DOMContentLoaded', function() {
    function playRandomTrack(trackElement) {
        const tracks = JSON.parse(trackElement.getAttribute('data-tracks'));
        console.log('Tracks:', tracks); // 调试输出：曲目列表
        
        let randomIndex = Math.floor(Math.random() * tracks.length);
        let selectedTrack = tracks[randomIndex];
        console.log('Selected Track:', selectedTrack); // 调试输出：被选中的曲目
        
        const audioElement = trackElement.querySelector('audio');
        audioElement.src = selectedTrack;
        audioElement.play();
    }

    document.querySelectorAll('.track').forEach(trackElement => {
        playRandomTrack(trackElement);
    });
});