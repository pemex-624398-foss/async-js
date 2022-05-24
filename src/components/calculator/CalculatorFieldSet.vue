<template>
  <v-row>
    <v-col cols="12" lg="3">
      <v-select
        :value="operation"
        @input="(value) => $emit('update:operation', value)"
        :items="operations"
        label="Operación"
        outlined
        :disabled="calculating"
      ></v-select>
    </v-col>
    <v-col cols="12" lg="2">
      <v-text-field
        :value="String(operand1)"
        @input="(value) => $emit('update:operand1', Number(value))"
        type="number"
        label="Operando 1"
        outlined
        :disabled="calculating"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="2">
      <v-text-field
        :value="String(operand2)"
        @input="(value) => $emit('update:operand2', Number(value))"
        type="number"
        label="Operando 2"
        outlined
        :disabled="calculating"
      ></v-text-field>
    </v-col>
    <v-col
      cols="12"
      lg="2"
      :class="$vuetify.breakpoint.mdAndUp ? 'shrink' : ''"
    >
      <v-btn
        color="accent"
        x-large
        block
        :disabled="calculating"
        @click="$emit('calculate')"
      >
        <v-icon>mdi-equal</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" lg="3">
      <v-text-field
        :value="result ? String(result) : ''"
        type="number"
        readonly
        label="Resultado"
        outlined
        :loading="calculating"
      >
        <template #append>
          <v-row class="flex-column">
            <v-btn
              x-small
              text
              :disabled="resultDecimals === 0 || calculating"
              @click="decreaseResultDecimals"
            >
              .0
              <v-icon x-small>mdi-arrow-left-thick</v-icon>
            </v-btn>
            <v-btn
              x-small
              text
              :disabled="resultDecimals === maxResultDecimals || calculating"
              @click="increaseResultDecimals"
            >
              .00
              <v-icon x-small>mdi-arrow-right-thick</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CalculatorOperation from "@/core/model/calculator/calculator-operation";

@Component({
  name: "CalculatorFieldSet"
})
export default class CalculatorFieldSet extends Vue {
  // Props
  @Prop({ type: String, required: true })
  protected operation!: CalculatorOperation;

  @Prop({ type: Number, required: true, default: 0 })
  protected operand1!: number;

  @Prop({ type: Number, required: true, default: 0 })
  protected operand2!: number;

  @Prop({ type: Number, required: true, default: 0 })
  protected result!: number;

  @Prop({ type: Number, required: true, default: 0 })
  protected resultDecimals!: number;

  @Prop({ type: Number, required: true, default: 0 })
  protected maxResultDecimals!: number;

  @Prop({ type: Boolean, default: false })
  protected calculating!: boolean;

  // Data
  protected operations: Array<{ value: CalculatorOperation; text: string }> = [
    {
      value: CalculatorOperation.Addition,
      text: "Suma ( + )"
    },
    {
      value: CalculatorOperation.Subtraction,
      text: "Resta ( - )"
    },
    {
      value: CalculatorOperation.Multiplication,
      text: "Multiplicación ( x )"
    },
    {
      value: CalculatorOperation.Division,
      text: "División ( / )"
    }
  ];

  // Methods
  increaseResultDecimals() {
    if (this.resultDecimals === this.maxResultDecimals) return;

    this.$emit("update:resultDecimals", this.resultDecimals + 1);
  }

  decreaseResultDecimals() {
    if (this.resultDecimals === 0) return;

    this.$emit("update:resultDecimals", this.resultDecimals - 1);
  }
}
</script>
