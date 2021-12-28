<template>
  <div class="wrapper">
    <textarea class="regular-input" v-model="input"></textarea>

    <emoji-picker @emoji="append" :search="search">
      <div
        class="emoji-invoker"
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        @click.stop="clickEvent"
      >
        h
      </div>
      <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
        <div class="emoji-picker" :style="{ top: display.y + 'px', left: display.x + 'px' }">
          <div class="emoji-picker__search">
            <input type="text" v-model="search" v-focus>
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5>{{ category }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </emoji-picker>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>