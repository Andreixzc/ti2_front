async function closeModal(modelId) {
  // verificar se esta passando ocm #
  // verificar se esta passando ocm #
  // verificar se esta passando ocm #
  await setTimeout(() => {
    $(`${modelId}`).modal("hide");
  }, 300);

  return;
}

export { closeModal };
