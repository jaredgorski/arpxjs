use arpx;
use neon::prelude::*;
use neon::register_module;

fn arpxjs(mut cx: FunctionContext) -> JsResult<JsString> {
    let profile = match cx.argument_opt(0) {
        Some(arg) => {
            let pr_path: Handle<JsString> = arg.downcast::<JsString>().or_throw(&mut cx)?;
            arpx::profile::get_profile(pr_path.value())
        }
        None => panic!("!profile"),
    };

    let processes = match cx.argument_opt(1) {
        Some(arg) => {
            let processes_arr: Handle<JsArray> = arg.downcast::<JsArray>().or_throw(&mut cx)?;
            let processes_vec: Vec<Handle<JsValue>> = processes_arr.to_vec(&mut cx)?;
            processes_vec
                .iter()
                .map(|js_value| js_value.downcast::<JsString>().unwrap().value())
                .collect()
        }
        None => panic!("!processes"),
    };

    arpx::commands::run::run(&profile.unwrap(), processes);
    Ok(cx.string("OK"))
}

register_module!(mut m, { m.export_function("arpxjs", arpxjs) });
