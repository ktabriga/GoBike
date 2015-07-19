import controller from './controller'

function run(router) {
  router.route('/places')
    .get(controller.find)
    .post(controller.create);
}

export default run;