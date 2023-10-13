import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils'
import TableData from '../TableData.vue'
import todoData from '@/data/todo-data.json'
import { useStoreTodo } from '@/stores/storeTodo.js'
describe('TableData', () => {
  let store
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useStoreTodo();

    store.notes = todoData.data
  });

  it('Should render the table', () => {
    const wrapper = mount(TableData, {
      propsData: {
        headTable: [{
          name: 'ID',
          key: 'id'
        },
        {
          name: 'Task',
          key: 'task'
        },
        {
          name: 'Priority',
          key: 'priority'
        },
        {
          name: 'Action',
          key: 'action'
        }],
      },
    });

    expect(wrapper.exists()).toBe(true)
    const tableRows = wrapper.findAll('tbody tr')
    expect(tableRows.length).toBeGreaterThan(0);

  });
  it('should open delete modal', async () => {
    const wrapper = mount(TableData, {
      propsData: {
        headTable: [{
          name: 'ID',
          key: 'id'
        },
        {
          name: 'Task',
          key: 'task'
        },
        {
          name: 'Priority',
          key: 'priority'
        },
        {
          name: 'Action',
          key: 'action'
        }],
      },
    });

    expect(wrapper.findComponent({ name: 'ModalDelete' }).exists()).toBe(false);
    await wrapper.vm.deleteNoteInfo({ id: 1, task: 'Tarea 1', priority: 'meh' });
    expect(wrapper.findComponent({ name: 'ModalDelete' }).exists()).toBe(true);
    await wrapper.vm.deleteNote();
  });
});