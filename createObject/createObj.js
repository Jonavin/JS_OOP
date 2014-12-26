    /**
     工厂模式：缺点不知道对象的类型 instanceof
    **/
    function createPerson(name,age,job){
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayHi = function (){
        alert(this.name);
      }
      return o;
    }
    var person = createPerson("张三",20,"it");
    person.sayHi();
    alert(person instanceof Object);//true
    
    /**
      构造函数模式
      
      没有显式创建
      
      有this
      
      没有return
      
      调用构造函数的过程
      1.创建一个新对象 new Object 或 {}
      2.讲构造函数的作用域赋给新对象 Person.call(o)
      3.执行构造函数
      4.返回新对象
      
      构造函数最初是用来标示对象类型的，但没有instanceof靠谱
      
      缺点：每个实例都不共享属性和方法（浪费内存）
    **/
    function Person(name,age,job){
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayHi = function(){
        alert(this.name);
      }
    }
    var person2 = new Person("张三",20,"it");
    person2.sayHi();
    alert(person2 instanceof Person);//true
    alert(person2 instanceof Object);//true
    
    
    /**
     原型模式,
     原型模式可以共享需要共享的属性。
     
     原型模式不能给构造函数传参数
     
     实例对象可以访问原型对象的属性，但是不能重写原型对象的属性，只能覆盖
     
     delete 可以恢复被实例覆盖的属性
     
     hasOwnProperty方法可以判断属性来自哪里
     
     in 操作会搜索原型链 结合hasOwnProperty可以判断属性是来自自身还是原型
     
     for in 操作可枚举实例对象和原型中所有可枚举的属性（[[Enumerable]] = true）
     
     实例对象屏蔽（覆盖）原型中不可枚举的属性也可for in ie8以前不可枚举（bug)
     
     keys方法可返回所有可枚举的属性（当前对象，不包括原型）
     
     getOwnPropertyNames方法可返回所有属性（不可枚举也可以）（不包括原型）
     
     原型的缺点还有所有的实例都共享属性，但我们有时候需要每个实例都有自己的属性，而且修改原型属性会反应到所有实例上
    **/
    
    function Person2 (){
      
    }
    var pp = Person2.prototype;
    pp.name = "张三";
    pp.age = 20;
    pp.job = "it";
    pp.sayHi = function (){
      alert(this.name);
    }
    var person3 = new Person2();
    person3.sayHi();
    var person4 = new Person2();
    person4.sayHi();
    alert(person4.constructor);//通过实例访问构造函数
    
    /**
    原型模式2：对象字面量
    
    创建函数时底层会自动为函数创建prototype对象，并且prototype的constructor属性指向构造函数
    
    下面的方式重写了prototype对象，所以constructor属性的指向就发生了变化，对象字面量相当于创建了一个Object实例，所以constructor熟悉指向了Object 
    
    我们需要重写constructor属性，但重写后constructor属性是可枚举的（默认）,es5的defineProperty可设置其为不可枚举，
    
    重写原型会阻断构造函数和原型之间的关系（不好），所以重写原型方式必须保证new对象在重写原型语句之后(实例中的指针仅指向原型，不指向构造函数)
    **/

    function Person3(){
      
    }
    Person3.prototype = {
      constructor:Person3,
      name:"张三",
      age:20,
      job:"it",
      sayHi:function (){
        alert(this.name);
      }
    }
