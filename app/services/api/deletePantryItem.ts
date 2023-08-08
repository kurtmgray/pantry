export const deletePantryItem = async (pantryItemId: number) => {
    console.log("pantryItemId", pantryItemId);
    try {
      const response = await fetch(`/api/pantry/?id=${pantryItemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Item deleted successfully.");
        return pantryItemId
      } else {
        console.error("Failed to delete item: ", response);
      }
    } catch (error) {
      console.error("Error while deleting item:", error);
    }
}
