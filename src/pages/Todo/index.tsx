import { Button, Input, List } from "antd";
import React, { useState } from "react";
import styles from "./index.less";

const TodoPage: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const addItem = () => {
    if (value.trim()) {
      setItems([...items, value.trim()]);
      setValue("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a task"
          onPressEnter={addItem}
        />
        <Button type="primary" onClick={addItem} style={{ marginLeft: 8 }}>
          Add
        </Button>
      </div>
      <List
        bordered
        dataSource={items}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default TodoPage;
