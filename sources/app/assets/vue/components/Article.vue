<template>
  <div class="card w-100 mt-2">
    <div class="card-body">
      {{ plublication_date }}
      {{ title }}
      {{ desciption }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    plublication_date: {
      type: date,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desciption: {
      type: text,
      required: true
    }
  }
};
</script>
