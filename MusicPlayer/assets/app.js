const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)

    const player = $('.player')
    const heading = $('header h2')
    const cdThumb = $('.cd-thumb')
    const audio = $('#audio')
    const cd = $('.cd')
    const playBtn = $('.btn-toggle-play')
    const progress = $('#progress')
    const listBtn = $('.playlist-btn')
    const playlist = $('.playlist')

    const app = {
        currentIndex: 0,
        isPlaying: false,
        isShowing: false,
        songs: [
            {
                name: 'Cơn mơ băng giá Remix',
                singer: 'Bằng Kiều',
                path:'./assets/song/Con Mo Bang Gia remix.mp3',
                image:'./assets/img/bangkieu.jpg'
            },
            {
                name: 'Yêu em dài lâu',
                singer: 'Dj Hoàn Khúc',
                path:'./assets/song/Yêu Em Dài L�u(feat Dương Trần Nghĩa & Mike Hao).mp3',
                image:'./assets/img/djhoan.jpg'
            },
            {
                name: 'Như những phút ban đầu',
                singer: 'Bác sĩ Hải',
                path:'./assets/song/Nhu Nhung Phut Ban Dau - ZonWave (Remix).mp3',
                image:'./assets/img/phutbandau.jpg'
            },
            {
                name: 'Xe đạp',
                singer: 'Thùy Chi',
                path:'./assets/song/THÙY CHI ft M4U - XE ĐẠP ( GRUSI REMIX) FIX.mp3',
                image:'./assets/img/xedap.PNG'
            },
        ],
        render: function(){
            const htmls = this.songs.map(song => {
                return `
                    <div class="song">
                        <div class="song"
                            style="background-image:url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title"> ${song.name}</h3>
                            <p class="author"> ${song.singer} </p>
                        </div>
                        <div class="option">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                `
            })
            playlist.innerHTML = htmls.join('')
        },
        defineProperties: function () {
            Object.defineProperty(this, 'currentSong', {
                get: function () {
                    return this.songs[this.currentIndex]
                }
            })
        },
        handleEvents: function() {
            const _this = this

            const cdWidth = cd.offsetWidth

            // Xử lý phóng to thu nhỏ CD
            // document.onscroll = function(){
            //     const scrollTop = window.scrollY || document.documentElement.scrollTop
            //     const newCdWidth = cdWidth -  scrollTop

            //     cd.style.width  =   newCdWidth > 0 ? newCdWidth + 'px': 0
            //     cd.styel.opacity = newCdWidth / cdWidth
            // }

            listBtn.onclick = function(){
                if (_this.isShowing) {
                    playlist.open()
                } else {
                    playlist.remove()
                }

            }
            // Xử lý khi click play
            playBtn.onclick = function() {
                if (_this.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }
                
            }
            // Khi Song dc play
            audio.onPlay = function () {
                _this.isPlaying = true
                player.classList.add('playing')
            }

            // Khi Song Pause
            audio.onPause = function () {
                _this.isPlaying = false
                player.classList.remove('playing')
            }

            // Khi tien do bai hat thay doi
            audio.ontimeupdate = function () {

            }
        },
    
        loadCurrentSong: function() {
            
            heading.textContent = this. currentSong.name
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
            audio.src = this.currentSong.path
        },
        start: function(){
            this.defineProperties()

            this.handleEvents()

            this.loadCurrentSong()


            this.render()
        }
    }

    app.start()