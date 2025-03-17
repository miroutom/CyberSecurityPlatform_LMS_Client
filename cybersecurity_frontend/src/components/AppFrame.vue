<template>
  <iframe :src="taskPath" frameborder="0" @load="extractCode"></iframe>
</template>

<script>
export default {
  props: ["taskPath"],
  methods: {
    extractCode() {
      const iframeDocument = this.$el.contentWindow.document;
      const codeElement = iframeDocument.getElementById("code");
      const initialCode = codeElement ? codeElement.textContent : "";

      // Извлечение описания задания
      const descriptionElement =
        iframeDocument.getElementById("task-description");
      const descriptionHTML = descriptionElement
        ? descriptionElement.innerHTML
        : "";

      // Отправка обоих значений через событие
      this.$emit("code-updated", {
        code: initialCode,
        description: descriptionHTML,
      });
    },
  },
};
</script>
