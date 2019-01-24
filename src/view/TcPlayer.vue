<template>
  <div class="test" style="width: 100%;height: 100%">
    <div id="mp4" style="width: 100%;height: 100%">
      <!--<video playinline src="@/assets/img/5G.mp4" poster="@/assets/img/5G.png" controls="" controlsList="nodownload"></video>-->
    </div>
  </div>
</template>

<script>
  const TcPlayer = window.TcPlayer
  export default {
    data: () => ({
      tcPlayer: null,
      activeName: 'first'
    }),
    mounted () {
      console.log(TcPlayer)
      let rtmp = this.getParams('rtmp')
      let flv = this.getParams('flv')
      let m3u8 = this.getParams('m3u8')
      let live = this.getParams('live') === 'true'
      let coverpic = this.getParams('coverpic')
      let width = this.getParams('width')
      let height = this.getParams('height')
      let autoplay = this.getParams('autoplay') === 'true'
      let options = {
        mp4: '//1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f40.mp4',
        mp4_hd: '//1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f30.mp4',
        mp4_sd: '//1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f20.mp4',
        clarity: 'od',
        clarityLabel: {
          od: '原画',
          hd: '高清',
          sd: '标清'
        },
        rtmp: rtmp,
        flv: flv,
        m3u8: m3u8,
        coverpic: coverpic || {
          style: 'cover',
          src: '//vodplayerinfo-10005041.file.myqcloud.com/3035579109/vod_paster_pause/paster_pause1469013308.jpg'
        },
        autoplay: autoplay,
        live: live,
        width: width || '750',
        height: height || '320'
      }
      this.tcPlayer = new TcPlayer('mp4', options)
    },
    methods: {
      getParams (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.search.substr(1).match(reg)
        if (r !== null) {
          return decodeURIComponent(r[2])
        }
        return null
      }
    }
  }
</script>

<style lang="less" scoped>
  .test{
    .mp4 {
      padding: .2rem;
      font-size:0;
      /*height: 3.58rem;*/
      img {
        display: block;
        height: auto;
        width: 100%;
      }
      video {
        z-index: 10;
        object-fit: fill;
        height: auto;
        width: 100%;
      }
    }
  }
</style>
