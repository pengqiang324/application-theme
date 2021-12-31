
<script>
export default {
    name: 'Spin',
    functional: true,
    render(h) {
        return h(
            'span',
            { class: 'spin-dot spin-dot-spin' },
            [h('i', { class: 'spin-dot-item' }), h('i', { class: 'spin-dot-item' }), h('i', { class: 'spin-dot-item' }), h('i', { class: 'spin-dot-item' })]
        )
    }
}
</script>

<style lang='scss' scoped>
.spin-dot {
  position: relative;
  display: inline-block;
  font-size: 20px;
  width: 1em;
  height: 1em;
}

.spin-dot-spin {
  transform: rotate(45deg);
  -webkit-animation: antRotate 1.2s infinite linear;
          animation: antRotate 1.2s infinite linear;
}
.spin-dot-item {
  position: absolute;
  display: block;
  width: 9px;
  height: 9px;
  background-color: #1890ff;
  border-radius: 100%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  opacity: 0.3;
  -webkit-animation: antSpinMove 1s infinite linear alternate;
          animation: antSpinMove 1s infinite linear alternate;
}

.spin-dot-item:nth-child(1) {
  top: 0;
  left: 0;
}
.spin-dot-item:nth-child(2) {
  top: 0;
  right: 0;
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
}
.spin-dot-item:nth-child(3) {
  right: 0;
  bottom: 0;
  -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s;
}
.spin-dot-item:nth-child(4) {
  bottom: 0;
  left: 0;
  -webkit-animation-delay: 1.2s;
          animation-delay: 1.2s;
}

@-webkit-keyframes antSpinMove {
  to {
    opacity: 1;
  }
}
@keyframes antSpinMove {
  to {
    opacity: 1;
  }
}
@-webkit-keyframes antRotate {
  to {
    transform: rotate(405deg);
  }
}
@keyframes antRotate {
  to {
    transform: rotate(405deg);
  }
}
</style>