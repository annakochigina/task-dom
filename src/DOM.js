import { strictEqual } from 'assert';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const elm = document.createElement(tag);
        elm.innerHTML = content;
        document.body.append(elm);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    const addChild = (childrenCount, deep) => {
        let tmp_div = document.createElement('div');
        tmp_div.className = `item_${deep}`;
        if (deep < level) {
            for (let i = 0; i < childrenCount; i++) {
                tmp_div.appendChild(addChild(childrenCount, deep + 1));
            }
        }
        return tmp_div;
    };

    return addChild(childrenCount, 1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const needed_class_name = 'item_2';

    const tree = generateTree(2, 3);
    let elements_by_class_name = tree.getElementsByClassName(needed_class_name);

    Array.from(elements_by_class_name).forEach((elm_by_class_name) => {
        const childNodes = elm_by_class_name.childNodes;
        const tmp_section = document.createElement('section');
        tmp_section.className = needed_class_name;

        Array.from(childNodes).forEach((child_node) => {
            tmp_section.appendChild(child_node);
        });

        elm_by_class_name.replaceWith(tmp_section);
    });

    return tree;
}
