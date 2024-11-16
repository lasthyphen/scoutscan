<template>
  <div>
    here
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  _getCHeight,
  _getCChainID,
  _getCNetworkVersion
} from './../modules/network.js'

export default {
  name: 'EVMInfo',
  props: {
    bcID: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'networkEndpoint'
    ])
  },
  data () {
    return {
      networkVersion: '',
      chainID: '',
      height: ''
    }
  },
  created () {
    Promise.all([
      _getCHeight({
        endpoint: 'https://dijetsnet.uksouth.cloudapp.azure.com:443/',
        bcID: 'U' // this.bcID
      }),
      _getCChainID({
        endpoint: 'https://dijetsnet.uksouth.cloudapp.azure.com:443/',
        bcID: this.bcID
      }),
      _getCNetworkVersion({
        endpoint: 'https://dijetsnet.uksouth.cloudapp.azure.com:443/',
        bcID: this.bcID
      })])
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
}
</script>
