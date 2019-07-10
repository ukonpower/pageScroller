import * as ORE from 'ore-three-ts'
import * as THREE from 'three';
import { PageScroller } from './PageScroller';

export default class MainScene extends ORE.BaseScene{

	private renderer: THREE.WebGLRenderer;
	private box: THREE.Mesh;
	private light: THREE.Light;

	private scroller: PageScroller;

	constructor(){

		super();
		
		this.name = "MainScene";
		
	}

	onBind( gProps: ORE.GlobalProperties ){

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 0, 0, 10);

		for( let i = 0; i < 10; i++ ){
			const boxGeo = new THREE.BoxGeometry(1,1,1);
			const boXMat = new THREE.MeshNormalMaterial();
			this.box = new THREE.Mesh(boxGeo,boXMat);
			this.box.position.y = -i * 1.5;
			this.scene.add(this.box);
		}

        this.light = new THREE.DirectionalLight();
        this.light.position.y = 10;
		this.scene.add(this.light);

		this.scroller = new PageScroller( document.querySelector( '.wrapper' ));
		this.scroller.velocityAttenuation = 0.9;

		//html sections
		this.scroller.registerSections( document.querySelector( '.part1'), new THREE.Vector3( 0, 0, 10 ));
		this.scroller.registerSections( document.querySelector( '.part3'), new THREE.Vector3( 0, -8, 10 ));
		this.scroller.registerSections( document.querySelector( '.part4'), new THREE.Vector3( 0, -8, 10 ));
		this.scroller.registerSections( document.querySelector( '.part6'), new THREE.Vector3( 0, -13, 10 ), true);

	}

	animate( deltaTime: number ){
		
        this.box.rotateY(0.01);
		
		this.renderer.render(this.scene,this.camera);

		this.scroller.update( deltaTime )

		this.camera.position.copy( this.scroller.threePosition );
	
	}

	onResize(width, height) {
	
		super.onResize(width,height);

		this.scroller.resize();
	
	}

	onWheel( event: WheelEvent ){

		this.scroller.setScrollVelocity( event.deltaY * 0.3);

	}

    onTouchStart( cursor: ORE.Cursor, event: MouseEvent ) { }

    onTouchMove( cursor: ORE.Cursor, event: MouseEvent ) { }

    onTouchEnd( cursor: ORE.Cursor, event: MouseEvent ) { }
}