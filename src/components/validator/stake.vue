<template>
  <q-card
  flat
  class="panel2"
  >
    <q-card-section>
    <div class="q-mb-md text-medium text-purple">STAKE (DJT)</div>
    <div class="q-pl-sm">
      <span class="text-subtitle2"><small style="opacity: 0.8;">OWN</small></span>
      <span class="on-right text-medium text-h6">{{ getFormatAva(stakeAmount) }}</span>
      <span class="text-accent text-medium q-pl-xs" style="font-size: 12px;">DJT</span>
      <span style="cursor:pointer;text-decoration: underline;text-decoration-color: #3fcf8e;font-size: 9px;color:#3fcf8e;" class="text-medium q-pl-xs" @click="onClick('https://explorer.dijets.io/tx/' + txID)">TX DETAILS</span>
    </div>
    <div class="q-pl-sm">
      <span class="text-subtitle2"><small style="opacity: 0.8;">DELEGATED</small></span>
      <span class="on-right">{{ getFormatAva(delegateStake) }}</span>
      <span class="text-accent text-medium q-pl-xs" style="font-size: 12px;">DJT</span>
    </div>
    <q-separator class="q-mt-xs q-mb-xs" dark />
    <div class="q-pl-sm">
      <span class="text-subtitle2"><small style="opacity: 0.8;">TOTAL</small></span>
      <span class="on-right">{{ getFormatAva(totalStakeAmount) }}</span>
      <span class="text-accent text-medium q-pl-xs" style="font-size: 12px;">DJT</span>
    </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { getAvaFromnAva } from './../../utils/avax.js'

import {
  openURL
} from 'quasar'

export default {
  name: 'Stake',
  props: {
    stakeAmount: {
      type: String,
      required: true
    },
    txID: {
      type: String,
      required: true
    },
    delegateStake: {
      type: String,
      required: true
    },
    totalStakeAmount: {
      type: String,
      required: true
    }
  },
  methods: {
    getLocalString (val) {
      if (!val) return val
      return val.toLocaleString()
    },
    getFormatAva (val) {
      if (!val) return 0
      return this.getLocalString(getAvaFromnAva(val))
    },
    onClick (link) {
      if (!link) return
      try {
        openURL(link)
      } catch (err) {
      }
    }
  }
}
</script>
