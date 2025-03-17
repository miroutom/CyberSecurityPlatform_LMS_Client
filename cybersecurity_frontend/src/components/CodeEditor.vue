<template>
  <MonacoEditor
    v-model="code"
    :options="editorOptions"
    @editorDidMount="editorDidMount"
    @change="logChange"
    language="javascript"
  />
</template>

<script>
import MonacoEditor from "vue-monaco-editor";

export default {
  name: "CodeEditor",
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code: '// Напишите ваш код здесь\nconsole.log("Hello, Vulnerable App!");', // Начальный код
      editorOptions: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: true, // Важно для адаптивности редактора
        theme: "vs-dark", // Тема редактора (vs, vs-dark, hc-black)
        // Другие опции Monaco Editor можно настроить здесь
      },
    };
  },
  methods: {
    editorDidMount(editor, monaco) {
      // Редактор Monaco Editor готов
      console.log("Monaco Editor is ready!", editor, monaco);
      // Можно выполнить дополнительные настройки редактора здесь, если нужно
    },
    logChange(newCode) {
      // Код в редакторе изменился
      this.$emit("code-changed", newCode); // Эмитим событие с текущим кодом
    },
  },
};
</script>

<style scoped>
/* Стили для редактора*/
.monaco-editor-container {
  height: 100%; /* Заполнить родительский контейнер */
  display: flex;
}
</style>
