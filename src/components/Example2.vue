<template>
  <v-row>
    <v-col>
      <v-card>
        <v-toolbar color="secondary" dark flat>
          <v-toolbar-title>Calculadora</v-toolbar-title>
        </v-toolbar>
        <v-container class="pt-10 px-10">
          <calculator-field-set
            :operation.sync="calculateCommand.argument.operation"
            :operand1.sync="calculateCommand.argument.operand1"
            :operand2.sync="calculateCommand.argument.operand2"
            :result="result"
            :result-decimals.sync="resultDecimals"
            :max-result-decimals="maxResultDecimals"
            :calculating="calculateCommand.executing"
            @calculate="calculate"
          ></calculator-field-set>
          <v-row v-if="calculateCommand.error">
            <v-col>
              <v-alert type="error" color="error" border="bottom">
                {{ calculateCommand.error.message }}
              </v-alert>
            </v-col>
          </v-row>
        </v-container>

        <v-snackbar v-model="errorSnackbarVisible" type="error">
          Error al realizar operación
        </v-snackbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Heading from "@/components/Heading.vue";
import CalculateExtendedCommand from "@/core/use-cases/calculator/calculate-extended-command";
import CalculatorFieldSet from "@/components/calculator/CalculatorFieldSet.vue";

@Component({
  name: "Example2",
  components: { CalculatorFieldSet, Heading }
})
export default class Example2 extends Vue {
  // Data
  protected calculateCommand = new CalculateExtendedCommand();
  protected result = 0;
  protected maxResultDecimals = 6;
  protected resultDecimals = this.maxResultDecimals;
  protected errorSnackbarVisible = false;

  // Watch
  @Watch("resultDecimals")
  onResultDecimalsChanged() {
    this.formatResult();
  }

  // Methods
  async calculate() {
    try {
      await this.calculateCommand.executeAsync();
      this.formatResult();
    } catch (error) {
      this.errorSnackbarVisible = true;
    }
  }

  formatResult() {
    this.result = Number(
      this.calculateCommand.result?.toFixed(this.resultDecimals)
    );
  }
}
</script>
