<template>
  <div class="task-page-container">
    <div class="navigation">
      <button @click="previousTask" :disabled="currentTaskIndex === 0">
        Предыдущее
      </button>
      <span>{{ currentTask.title }}</span>
      <button
        @click="nextTask"
        :disabled="currentTaskIndex === tasks.length - 1"
      >
        Следующее
      </button>
    </div>
    <div class="task-description">
      <div v-html="currentTask.description"></div>
    </div>
    <div class="task-content">
      <div class="app-frame">
        <AppFrame :taskPath="currentTask.path" @code-updated="updateCode" />
      </div>
      <div class="code-editor">
        <CodeEditor
          v-model="currentTask.code"
          :language="currentTask.language"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppFrame from "./AppFrame.vue";
import CodeEditor from "./CodeEditor.vue";

export default {
  components: { AppFrame, CodeEditor },
  data() {
    return {
      tasks: [
        {
          title: "Задание 1: XSS",
          path: "/vulnerable-app/xss.html",
          code: "", // Начальный код будет загружен из HTML-файла
          language: "html",
          description: "",
        },
        {
          title: "Задание 2: CSRF",
          path: "/vulnerable-app/xss.html",
          code: "", // Начальный код будет загружен из HTML-файла
          language: "javascript",
          description: "",
        },
      ],
      currentTaskIndex: 0,
    };
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
  },
  methods: {
    previousTask() {
      this.currentTaskIndex = Math.max(0, this.currentTaskIndex - 1);
    },
    nextTask() {
      this.currentTaskIndex = Math.min(
        this.tasks.length - 1,
        this.currentTaskIndex + 1
      );
    },
    updateCode(data) {
      this.currentTask.code = data.code;
      this.currentTask.description = data.description; // Сохраняем описание
    },
  },
};
</script>

<style scoped>
/* Общие стили */
body {
  font-family: sans-serif; /* Шрифт без засечек, как на Portswigger */
  background-color: #d13c3c; /* Светло-серый фон */
  color: #333; /* Темно-серый текст */
  margin: 0; /* Убираем стандартные отступы */
}

.task-page-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Используем vh для корректной высоты на весь экран */
  margin: 20px; /* Добавляем внешние отступы */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Легкая тень */
  border-radius: 8px; /* Скругленные углы */
  overflow: hidden; /* Предотвращаем выход контента за границы контейнера */
}

/* Навигация */
.navigation {
  background-color: #fff; /* Белый фон для навигации */
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navigation button {
  background-color: #007bff; /* Синий цвет кнопок */
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Плавное изменение цвета при наведении */
}

.navigation button:hover {
  background-color: #0056b3;
}

.navigation button:disabled {
  background-color: #ccc;
  cursor: default;
}

.navigation span {
  font-weight: bold;
}

/* Описание задания */
.task-description {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

/* Контент задания (app-frame и code-editor) */
.task-content {
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
}

.app-frame,
.code-editor {
  flex: 1;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden; /* Добавляем overflow: hidden для iframe */
}

.app-frame iframe {
  width: 100%; /* iframe занимает всю ширину контейнера */
  height: 100%; /* iframe занимает всю высоту контейнера */
  border: none; /* Убираем границу iframe */
}
</style>
