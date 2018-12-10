<template>
  <div class="Calculator">
    <input 
      v-model="left" 
      type="number" 
      class="left">
    <select 
      v-model="operator" 
      name="operator">
      <option :value="Operators.ADD">+</option>
      <option :value="Operators.SUBTRACT">-</option>
      <option :value="Operators.MULTIPLE">*</option>
      <option :value="Operators.DEVIDE">/</option>
    </select>
    <input 
      v-model="right" 
      type="number" 
      class="right">
    <div class="answer">= {{ answer }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

enum Operators {
  ADD,
  SUBTRACT,
  MULTIPLE,
  DEVIDE
}

interface IData {
  Operators: typeof Operators
  left: string | null
  right: string | null
  operator: Operators
}

export default Vue.extend({
  data(): IData {
    return {
      Operators,
      left: null,
      right: null,
      operator: Operators.ADD
    }
  },
  computed: {
    answer(): number {
      if (!this.left || !this.right) return 0

      const left = Number(this.left)
      const right = Number(this.right)

      switch (this.operator) {
        case Operators.ADD:
          return left + right
        case Operators.SUBTRACT:
          return left - right
        case Operators.MULTIPLE:
          return left * right
        case Operators.DEVIDE:
          return left / right
        default:
          return 0
      }
    }
  }
})
</script>

<style scoped>
.Calculator {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

input {
  border: solid 1px #ddd;
  margin: 0 8px;
}
</style>
